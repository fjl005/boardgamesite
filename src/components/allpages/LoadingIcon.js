import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

const LoadingIcon = ({ color }) => {
    return (
        <div style={{
            display: 'flex',
            // display: 'inline',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <FontAwesomeIcon
                icon={faSpinner}
                spin size='2x'
                marginTop='100px'
                color={color}
            />
        </div>
    )
}

export default LoadingIcon;