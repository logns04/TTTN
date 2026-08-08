import {
    Phone,
    Mail,
    Facebook,
    Instagram,
    Youtube
} from "lucide-react";

export default function TopBar() {
    return (
        <div className="bg-neutral-900 text-white text-sm">

            <div className="max-w-7xl mx-auto h-10 flex items-center justify-between px-4">

                <div className="flex items-center gap-6">

                    <div className="flex items-center gap-2">
                        <Phone size={15} />
                        <span>0909 999 999</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Mail size={15} />
                        <span>contact@furniture.com</span>
                    </div>

                </div>

                <div className="flex items-center gap-3">

                    <Facebook
                        size={18}
                        className="cursor-pointer hover:text-orange-500 duration-300"
                    />

                    <Instagram
                        size={18}
                        className="cursor-pointer hover:text-orange-500 duration-300"
                    />

                    <Youtube
                        size={18}
                        className="cursor-pointer hover:text-orange-500 duration-300"
                    />

                </div>

            </div>

        </div>
    );
}