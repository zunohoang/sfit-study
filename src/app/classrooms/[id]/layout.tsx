
export default function Component({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            {children}
        </div>
    )
}