const JOB_STATUS = {
    1: 'Register',
    2: 'Logged In',
    3: 'Logout',
    4: 'Trial Eligible',
    5: 'Trial Used',
    6: 'Trial Not Eligible',
    7: 'In Process',
    8: 'Complete',
    9: 'Active',
    10: 'Inactive',
    11: 'Paid',
    12: 'Cancel',
    13: 'Replaced',
}

const JOB_STATUS_CLASS = {
    7: 'status_inprogress',
    8: 'status_success',
    12: 'status_cancel',
}

export {
    JOB_STATUS ,JOB_STATUS_CLASS
}