import Email from './Email'

{/* Render the email list */}
function Emails ({ emails, onToggleRead, onToggleStar }) {
    return (
        <ul>
            {emails.map((email, id) => (
                <Email
                    key={id}
                    email={email}
                    onToggleRead={onToggleRead}
                    onToggleStar={onToggleStar}
                />
            ))}
        </ul>
    )
}

export default Emails