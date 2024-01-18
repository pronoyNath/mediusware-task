import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const Problem1 = () => {

    const axiosPublic = useAxiosPublic();
    const [show, setShow] = useState('all');
    const [formData, setFormData] = useState({ name: '', status: '', });



    // feting by status filterd
    const { data: filterdUsers, refetch } = useQuery({
        queryKey: ['userCollection', show],
        queryFn: async () => {
            if (show === 'all') {
                const result = await axiosPublic.get('/user-collection/all');
                return result.data;
            } else {
                const result = await axiosPublic.get(`/user-collection/${show}`);
                return result.data;
            }
        },
        initialData: [],
    });


    // console.log(users);

    // posting user data 
    const handlePost = (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const status = form.get('status');
        // console.log(name, status);

        const data = { name, status };

        axiosPublic.post(`/user-collection`, data)
            .then(({ data }) => {

                if (data?.insertedId) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "User Created Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // Clear input fields
                    setFormData({
                        name: '',
                        status: '',
                    });
                }

            })
            .catch((error) => {
                // Show error toast if update fails
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Failed to Create User",
                    showConfirmButton: false,
                    timer: 1500
                });

            });

    }

    const handleChange = (e) => {
        // Update form data when input values change
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleClick = (status) => {
        setShow(status);
      };

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form onSubmit={handlePost} className="row gy-2 gx-3 align-items-center mb-4">
                        <div className="col-auto">
                            <input name='name' required onChange={handleChange} value={formData.name} type="text" className="form-control" placeholder="Name" />
                        </div>
                        <div className="col-auto">
                            <input required value={formData.status} onChange={handleChange} name='status' type="text" className="form-control" placeholder="Status" />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'all' && 'active'}`} type="button" onClick={() => handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'active' && 'active'}`} type="button" onClick={() => handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'completed' && 'active'}`} type="button" onClick={() => handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>

                            {filterdUsers.map((user, idx) => (
                                <tr key={idx}>
                                    <td>{user.name}</td>
                                    <td>{user.status}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;