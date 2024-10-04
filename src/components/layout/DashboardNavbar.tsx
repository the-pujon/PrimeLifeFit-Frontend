import React from 'react'
import { LogOut,Home,Menu } from 'lucide-react'
import { Link,useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const DashboardNavbar: React.FC = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        // Implement logout logic here
        // For example: authService.logout()
        navigate('/login')
    }

    return (
        <header className="bg-primary shadow-md sticky top-0 z-20">
            <div className="wrapper px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <Button variant="ghost" size="icon" className="text-white md:hidden mr-2">
                            <Menu className="h-[1.2rem] w-[1.2rem]" />
                        </Button>
                        <Link to="/dashboard" className="text-xl font-semibold text-white">
                            Dashboard
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {/*<form onSubmit={handleSearch} className="hidden sm:block">
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2 rounded-full bg-white/10 text-white placeholder-white/75 focus:outline-none focus:ring-2 focus:ring-white/50"
                                    ref={searchInputRef}
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/75" size={18} />
                            </div>
                        </form>*/}
                        <Button asChild variant="ghost" size="icon" className="text-white">
                            <Link to="/" title="Home">
                                <Home className="h-[1.2rem] w-[1.2rem]" />
                            </Link>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-white">
                                    <LogOut className="h-[1.2rem] w-[1.2rem]" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onSelect={handleLogout}>
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default DashboardNavbar