import {useSelector} from "react-redux";


const Notification = () => {
	const notification = useSelector(state => state.notification)
	// console.log(notification)

	if (notification.message === null) return null

	return (
		<div className={notification.className}>
			{notification.message}
		</div>
	)
}


export default Notification
