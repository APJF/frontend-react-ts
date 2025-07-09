"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { User, Settings, LogOut } from "lucide-react";

interface UserInfo {
    username: string;
    avatarUrl?: string;
}

export function AuthSection() {
    const [user, setUser] = useState<UserInfo | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (token && userData) {
            try {
                const parsed = JSON.parse(userData);
                setUser({
                    username: parsed.username,
                    avatarUrl: parsed.avatarUrl,
                });
            } catch {
                setUser(null);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("avatar");
        setUser(null);
        navigate("/login");
    };

    if (!user) {
        return (
            <div className="flex items-center space-x-2">
                <a href="/login">
                    <Button variant="ghost" size="sm">
                        Đăng Nhập
                    </Button>
                </a>
                <a href="/register">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                        Đăng Ký
                    </Button>
                </a>
            </div>
        );
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <div
                className="relative"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                <PopoverTrigger asChild>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Avatar className="w-8 h-8">
                            <AvatarImage src={user.avatarUrl} alt={user.username} />
                            <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-gray-800">{user.username}</span>
                    </div>
                </PopoverTrigger>

                <PopoverContent
                    className="w-48 mt-2 bg-white border rounded shadow z-50"
                    align="end"
                    sideOffset={8}
                >
                    <div className="flex flex-col gap-2">
                        <Button
                            variant="ghost"
                            className="justify-start w-full text-left gap-2"
                            onClick={() => {
                                setIsOpen(false);
                                navigate("/profile");
                            }}
                        >
                            <User className="w-4 h-4" />
                            Thông tin cá nhân
                        </Button>
                        <Button
                            variant="ghost"
                            className="justify-start w-full text-left gap-2"
                            onClick={() => {
                                setIsOpen(false);
                                navigate("/changepass");
                            }}
                        >
                            <User className="w-4 h-4" />
                            Thay đổi mật khẩu
                        </Button>
                        <Button
                            variant="ghost"
                            className="justify-start w-full text-left gap-2"
                            onClick={() => {
                                setIsOpen(false);
                                navigate("/settings");
                            }}
                        >
                            <Settings className="w-4 h-4" />
                            Cài đặt
                        </Button>
                        <Button
                            variant="ghost"
                            className="justify-start w-full text-left gap-2 text-red-600"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-4 h-4" />
                            Đăng Xuất
                        </Button>
                    </div>
                </PopoverContent>
            </div>
        </Popover>

    );
}
