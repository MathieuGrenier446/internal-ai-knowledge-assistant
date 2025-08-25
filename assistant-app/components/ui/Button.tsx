import React from 'react';
import { cva, type VariantProps } from 'cva';
import { cn } from '@/lib/utils';

// Button variants using the new state colors from global.css
const buttonVariants = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-md',
    'text-sm',
    'font-medium',
    'transition-colors',
    'duration-200',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-interactive-focus',
    'focus-visible:ring-offset-2',
  ],
  {
    variants: {
      intent: {
        primary: [
          'bg-primary',
          'text-white',
          'border-transparent',
        ],
        secondary: [
          'bg-surface',
          'text-foreground',
          'border-transparent',
        ],
        success: [
          'bg-success',
          'text-white',
          'border-transparent',
        ],
        warning: [
          'bg-warning',
          'text-white',
          'border-transparent',
        ],
        danger: [
          'bg-danger',
          'text-white',
          'border-transparent',
        ],
        outline: [
          'bg-transparent',
          'text-foreground',
          'border',
          'border-border',
        ],
        ghost: [
          'bg-transparent',
          'text-foreground',
          'border-transparent',
        ],
      },
      size: {
        sm: ['h-9', 'px-3', 'text-sm'],
        md: ['h-10', 'px-4', 'py-2'],
        lg: ['h-11', 'px-6', 'text-base'],
        icon: ['h-10', 'w-10', 'rounded-full'],
      },
      disabled: {
        false: null,
        true: ['cursor-not-allowed', 'pointer-events-none'],
      },
    },
    compoundVariants: [
      // Hover states for enabled buttons (using our new state colors)
      {
        intent: 'primary',
        disabled: false,
        class: 'hover:bg-primary-hover active:bg-primary-active',
      },
      {
        intent: 'secondary',
        disabled: false,
        class: 'hover:bg-interactive-hover active:bg-interactive-active',
      },
      {
        intent: 'success',
        disabled: false,
        class: 'hover:bg-success-hover active:bg-success-active',
      },
      {
        intent: 'warning',
        disabled: false,
        class: 'hover:bg-warning-hover active:bg-warning-active',
      },
      {
        intent: 'danger',
        disabled: false,
        class: 'hover:bg-danger-hover active:bg-danger-active',
      },
      {
        intent: 'outline',
        disabled: false,
        class: 'hover:bg-interactive-hover hover:text-surface active:bg-interactive-active active:text-surface',
      },
      {
        intent: 'ghost',
        disabled: false,
        class: 'hover:bg-interactive-hover active:bg-interactive-active',
      },

      // Disabled states (using our disabled colors)
      {
        intent: 'primary',
        disabled: true,
        class: 'bg-primary-disabled text-white',
      },
      {
        intent: 'success',
        disabled: true,
        class: 'bg-success-disabled text-white',
      },
      {
        intent: 'warning',
        disabled: true,
        class: 'bg-warning-disabled text-white',
      },
      {
        intent: 'danger',
        disabled: true,
        class: 'bg-danger-disabled text-white',
      },
      {
        intent: ['secondary', 'outline', 'ghost'],
        disabled: true,
        class: 'bg-interactive-disabled text-interactive-disabled',
      },
    ],
    defaultVariants: {
      intent: 'primary',
      size: 'md',
      disabled: false,
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof buttonVariants> {}

export default function Button({ 
  className, 
  intent, 
  size, 
  disabled,
  ...props 
}: ButtonProps) {
  return (
    <button 
      className={cn(buttonVariants({ intent, size, disabled }), className)}
      disabled={disabled || undefined}
      {...props}
    />
  );
}

// Example usage with the new state colors
export function ButtonShowcase() {
  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-bold">Button States with Custom Colors</h2>
      
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Normal States:</h3>
        <div className="flex gap-3 flex-wrap">
          <Button intent="primary">Primary</Button>
          <Button intent="secondary">Secondary</Button>
          <Button intent="success">Success</Button>
          <Button intent="warning">Warning</Button>
          <Button intent="danger">Danger</Button>
          <Button intent="outline">Outline</Button>
          <Button intent="ghost">Ghost</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Disabled States (custom disabled colors):</h3>
        <div className="flex gap-3 flex-wrap">
          <Button intent="primary" disabled>Primary Disabled</Button>
          <Button intent="secondary" disabled>Secondary Disabled</Button>
          <Button intent="success" disabled>Success Disabled</Button>
          <Button intent="warning" disabled>Warning Disabled</Button>
          <Button intent="danger" disabled>Danger Disabled</Button>
          <Button intent="outline" disabled>Outline Disabled</Button>
          <Button intent="ghost" disabled>Ghost Disabled</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Hover/Active States:</h3>
        <p className="text-sm text-gray-600">
          Hover over buttons to see custom hover colors. Click and hold to see active states.
        </p>
      </section>
    </div>
  );
}