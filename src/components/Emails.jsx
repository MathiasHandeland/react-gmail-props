import Email from './Email'

{/* Render the email list */}
function Emails ({ emails, onToggleRead, onToggleStar, onOpenEmail }) {
    return (
        <ul>
            {emails.map((email, id) => (
                <Email
                    key={id}
                    email={email}
                    onToggleRead={onToggleRead}
                    onToggleStar={onToggleStar}
                    onOpenEmail={onOpenEmail}
                />
            ))}
        </ul>
    )
}

export default Emails