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
          "hover:bg-gray-400"
        ],
        secondary: [
          "bg-white",
          "text-black",
          "hover:bg-gray-200",
        ],
      },
      size: {
        large: ["h-12", "w-36"],
        medium: ["h-10", "w-36"]
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