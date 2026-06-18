export function SideWord({ children, dark, className }: { children: string; dark?: boolean; className?: string }) {
	return (
		<div className={`side-word${dark ? " dark" : ""}${className ? ` ${className}` : ""}`} aria-hidden="true">
			<div className="side-word-track">
				{[0,1,2,3,4,5].map(i => <span key={i}>{children}</span>)}
			</div>
		</div>
	);
}
