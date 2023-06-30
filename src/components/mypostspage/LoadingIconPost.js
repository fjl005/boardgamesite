import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

const LoadingIconPost = ({ color, marginLeft }) => {
    return (
        <div style={{
            display: 'inline',
            marginLeft: marginLeft
        }}>
            <FontAwesomeIcon
                icon={faSpinner}
                spin size='2x'
                color={color}
            />
        </div>
    )
}

export default LoadingIconPost;