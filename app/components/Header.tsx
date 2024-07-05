"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

import { useTheme } from "next-themes"
import { MoonIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

const Logo = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.18182C6.57757 2.18182 2.18182 6.57757 2.18182 12C2.18182 17.4224 6.57757 21.8182 12 21.8182C17.4224 21.8182 21.8182 17.4224 21.8182 12C21.8182 6.57757 17.4224 2.18182 12 2.18182ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z"
        fill="#FAFAFA"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.9865 7.93164C18.3063 6.92427 17.351 5.97813 16.3467 6.30765L9.50624 8.55218C9.11027 8.68211 8.80091 8.99447 8.67481 9.39167L6.55523 16.0683C6.23543 17.0757 7.19076 18.0219 8.19499 17.6923L15.0355 15.4478C15.4314 15.3179 15.7408 15.0055 15.8669 14.6083L17.9865 7.93164ZM12.2696 13.5584C13.1303 13.5584 13.828 12.8607 13.828 12C13.828 11.1393 13.1303 10.4415 12.2696 10.4415C11.4089 10.4415 10.7112 11.1393 10.7112 12C10.7112 12.8607 11.4089 13.5584 12.2696 13.5584Z"
        fill="#FAFAFA"
      />
    </svg>
  )
}

const links = [
  { name: "Financeiro", href: "/" },
  { name: "Ferramentas", href: "/tools" },
  { name: "Educação", href: "/education" },
  { name: "Notícias", href: "/news" },
  { name: "Investimentos", href: "/investments" },
]

export const Header = () => {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (resolvedTheme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  return (
    <header className="flex w-full justify-between border-b border-border px-6 py-4">
      <div className="flex items-center gap-4">
        <Logo />

        <hr className="h-full w-[1px] bg-secondary" />

        {links.map((link) => (
          <Link
            key={link.href}
            className={` ${pathname === link.href ? "text-foreground" : "text-zinc-500 transition hover:text-foreground"}`}
            href={link.href}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Button onClick={toggleTheme} variant={"ghost"}>
          <MoonIcon size={16} />
        </Button>

        {/* <Select defaultValue="light">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Account" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Vitor Gouveia</SelectItem>
            <SelectItem value="dark">Duff Houston</SelectItem>
            <Button
              variant="secondary"
              size={"sm"}
              className="flex w-full items-center justify-start gap-2"
            >
              Import new Waaallet <PlusIcon size={16} />
            </Button>
          </SelectContent>
        </Select> */}
      </div>
    </header>
  )
}
