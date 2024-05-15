import React, { useEffect, useState } from 'react';

const Read = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');


    //Getting data from Backend-mongoDb server through req.body in json
    async function getData() {
       try {
           const response = await fetch("http://localhost:3000");
           const result = await response.json();
           if (!response.ok) {
               setError(result.error);
           } else {
               setData(result);
               setError('');
           }
       } catch (error) {
           console.error('Error fetching data:', error);
           setError('Error fetching data');
       }
    }
   
    //DELETING DATA IN MONGO AFTER CALLING DELETE FUNTION THROUGH NODE
    async function handleDelete(id) {
        try {
            const response = await fetch(`http://localhost:3000/${id}`, {method: "DELETE"});
            const result = await response.json(); 
            if (!response.ok) {
                setError(result.error);
            } else {
                
                setError('Data deleted sucesfully');
                
                setTimeout(()=>{
                    setError("");
                    getData();
                }, 2000);

            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data');
        }
     }
     //LOADING DATA ON DOM(WEBSITE) WHEN RELOADING OR HITTING END POINT
    useEffect(() => {
        getData();
    }, []);

    return (
        <div className='container my-2 text-center'>
            <h2 className='text-center'>Your Saved Posts</h2>
            <div className='row'>
                {data?.map((ele) => (
                    <div key={ele._id} className='col-3'>
                        <div className='card mt-3'>
                            <div className='card-body'>
                                <h5 className='card-title'>{ele.name}</h5>
                                <h6 className='card-subtitle mb-2 text-muted'>{ele.age}</h6>
                                <a href="#" className="card-link" onClick={()=>handleDelete(ele._id)}>Delete</a>
                                <a href={`/${ele._id}`} className="card-link">Edit</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
};

export default Read;
