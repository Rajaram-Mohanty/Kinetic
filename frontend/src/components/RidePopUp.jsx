import React from 'react'

const RidePopUp = (props) => {
  return (
    <div>
        <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setRidePopupPanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>New Ride Available</h3>
            <div className='flex items-center justify-between p-3 bg-yellow-300 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 rounded-full object-fit-cover w-12' src="https://www.marktechpost.com/wp-content/uploads/2023/03/Blog-Banner-5.jpg" alt="" />
                    <h2 className='text-lg font-medium'>Sashi Kumar</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.5 KM</h5>
            </div>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.fare[ props.vehicleType ]}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
                <div className='flex mt-5 w-full-items-center justify-between'>

                    <button onClick={() => {
                    props.setConfirmRidePopupPanel(true)
                    props.setVehicleFound(true)
                    props.setConfirmRidePanel(false)


                }} className='bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Accept</button>
                <button onClick={() => {
                    props.setRidePopupPanel(false)



                }} className='mt-1 bg-gray-400 text-gray-700 font-semibold p-3 px-10 rounded-lg'>Ignore</button>
                
                </div>
                
            </div>

    </div>
  )
}

export default RidePopUp
