import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // VIP Mexican Variants
        emerald: "border-transparent bg-verde-esmeralda text-white hover:bg-verde-bosque shadow-md hover:shadow-lg",
        wine: "border-transparent bg-rojo-vino text-white hover:bg-rojo-cardenal shadow-md hover:shadow-lg",
        gold: "border-transparent bg-dorado text-verde-oscuro hover:bg-oro-antiguo shadow-md hover:shadow-lg",
        ivory: "border-verde-esmeralda/30 bg-marfil text-verde-oscuro hover:bg-verde-esmeralda hover:text-white",
        elegant: "border-transparent bg-gradient-to-r from-verde-esmeralda to-rojo-vino text-white hover:from-rojo-vino hover:to-verde-esmeralda shadow-lg",
        luxury: "border-dorado bg-gradient-to-r from-dorado/20 to-oro-antiguo/20 text-verde-oscuro hover:from-dorado/30 hover:to-oro-antiguo/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
