import { cva } from "class-variance-authority";

interface ButtonProps {
    text: string,
    handler: Function,
    variant?: "primary" | "secondary",
    size?: "medium" | "large"
}

const buttonStyles = cva(["flex", "justify-center", "place-items-center", "rounded-[12px]", "font-semibold"], {
    variants: {
      intent: {
        primary: [
          "bg-primary",
          "text-white",
          "hover:bg-indigo-700"
        ],
        secondary: [
          "bg-white",
          "text-black",
          "hover:bg-gray-200",
        ],
      },
      size: {
        large: ["h-14", "w-40"],
        medium: ["h-10", "w-40"]
      }
    }
})

const Button = ({
     text,
     handler,
     variant = "primary",
     size = "medium"
}: ButtonProps) => {
    return (
        <button onClick={() => handler()} className={buttonStyles({ intent: variant, size: size })}>
            {text}
        </button>
    )
}

export default Button