
function Email ({ email, onToggleRead, onToggleStar, onOpenEmail }) {
    return (
       <li className={`email ${email.read ? 'read' : 'unread'}`}
       onClick={() => onOpenEmail(email)}
       >
        <div className="select">
            <input
            className="select-checkbox"
            type="checkbox"
            checked={email.read}
            onChange={(e) => {
                e.stopPropagation()
                onToggleRead(email)
            }}
            />
        </div>
        <div className="star">
        <input
            className="star-checkbox"
            type="checkbox"
            checked={email.starred}
            onChange={(e) => {
                e.stopPropagation()
                onToggleStar(email)
            }}
        />
        </div>
        <div className="sender">{email.sender}</div>
        <div className="title">{email.title}</div>
    </li>
    )
}

export default Email