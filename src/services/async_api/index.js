import { toast } from "react-toastify";
import { base_url } from "services/base_url";
import axiosApiInstance from "services/interceptor";

const user_listing = async () => {
    return await axiosApiInstance.post(base_url + "getusers")
}

const add_new_user = async (data) => {
    return await axiosApiInstance.post(base_url + "create_user", data)
}

const update_user = async (data) => {
    return await axiosApiInstance.post(base_url + "edit_user", data)
}

const getUserById = async (data) => {
    return await axiosApiInstance.post(base_url + "get_user_by_id", data)
}

const make_incative_user = async (data) => {
    return await axiosApiInstance.post(base_url + "inactive_user", data)
}

const make_is_admin = async (data) => {
    return await axiosApiInstance.post(base_url + "make_admin", data)
}

const orderlisting = async (data) => {
    return await axiosApiInstance.post(base_url + "getjobs", data)
}

const orderDetails = async (data) => {
    return await axiosApiInstance.post(base_url + "getjobsdetail", data)
}

const get_order_by_id = async (data) => {
    return await axiosApiInstance.post(base_url + "getparentjobsdetail", data)
}

const downloadPdf = (doc) => {
    return fetch(process.env.REACT_APP_BASE_URL + 'downloadfile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ job_id: doc.job_id }),
    })
        .then(response => {
            if (response.status === 200) {
                return response.blob()
            } else {
                return response.json();
            }
        })
        .then(blob => {
            if (blob?.success === false) {
                toast(blob.message, { className: blob.status ? '_success' : '_error' })
            } else {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', doc.filename);
                document.body.appendChild(link);
                link.click();
            }
        })
        .catch(err => {
            console.log(err)
        })
}

const download_report = (doc) => {
    return fetch(process.env.REACT_APP_BASE_URL + 'downloadreport', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ job_id: doc.job_id }),
    })
        .then(response => {
            return response.json();
        })
        .then(blob => {
            if (blob?.success === false) {
                toast(blob.message, { className: blob.status ? '_success' : '_error' })
            } else {
                const link = document.createElement('a');
                link.href = blob.file;
                link.setAttribute('download', doc.filename);
                document.body.appendChild(link);
                link.click();
            }
        })
        .catch(err => {
            console.log(err)
        })
}

const download_all_pdf = (data) => {
    return fetch(process.env.REACT_APP_BASE_URL + 'downloadallfile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            return response.json()
        })
        .then(blob => {
            if (blob?.success === false) {
                toast(blob.message, { className: blob.status ? '_success' : '_error' })
            } else {
                const link = document.createElement('a');
                link.href = blob.file;
                link.setAttribute('download', 'custom_filename');
                document.body.appendChild(link);
                link.click();
            }
        })
        .catch(err => {
            console.log(err)
        })
}

const download_all_report = (data) => {
    return fetch(process.env.REACT_APP_BASE_URL + 'downloadallreport', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            return response.json()
        })
        .then(blob => {
            if (blob?.success === false) {
                toast(blob.message, { className: blob.status ? '_success' : '_error' })
            } else {
                const link = document.createElement('a');
                link.href = blob.file;
                link.setAttribute('download', 'custom_filename');
                document.body.appendChild(link);
                link.click();
            }
        })
        .catch(err => {
            console.log(err)
        })
}

const order_in_process = async (data) => {
    return await axiosApiInstance.post(base_url + "processingorders", data)
}

export const services = {
    user_listing,
    add_new_user,
    update_user,
    getUserById,
    make_incative_user,
    make_is_admin,
    orderlisting,
    orderDetails,
    downloadPdf,
    download_report,
    download_all_pdf,
    download_all_report,
    order_in_process,
    get_order_by_id
}