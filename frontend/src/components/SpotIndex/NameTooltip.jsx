export default function NameTooltip({name, hidden}) {
    return <div className={'name-tooltip' + hidden ? ' hidden' : ''}>{name}</div>
}