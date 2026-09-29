import React from 'react';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  surface?: 'base' | 'raised' | 'inverse' | 'accent';
  children: React.ReactNode;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ surface = 'base', className = '', children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        data-surface={surface}
        className={className}
        {...props}
      >
        {children}
      </section>
    );
  }
);
Section.displayName = 'Section';
