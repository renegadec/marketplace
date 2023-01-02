import { cva } from "class-variance-authority";

interface ButtonProps {
    text: string,
    handler: Function,
    variant?: "primary" | "secondary" | "outline",
    size?: "medium" | "large",
    width?: "default" | "full",
    round?: "none" | "medium"
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
        outline: [
          "bg-transparent",
          "border-2",
          "border-white",
          "text-white",
          "hover:border-gray-200",
          "hover:text-gray-200"
        ]
      },
      size: {
        large: ["h-12"],
        medium: ["h-10"]
      },
      round: {
        none: ["rounded-[0px]"],
        medium: ["rounded-[12px]"]
      },
      width: {
        default: "w-36",
        full: "w-full"
      }
    }
})

const Button = ({
     text,
     handler,
     variant = "primary",
     size = "medium",
     width = "default",
     round = "medium"
}: ButtonProps) => {
    return (
        <button 
          onClick={() => handler()} 
          className={ `${buttonStyles({ intent: variant, size: size, width: width, round: round })}` }>
            {text}
        </button>
    )
}

export default Button