export const tableCols = [
    { label: "Account", prop: "Account", width: "", isFixed: false },
    { label: "Role", prop: "Role", width: "", isFixed: false },
    { label: "Name", prop: "Name", width: "", isFixed: false },
    { label: "Create time", prop:"createTime" , width: 200, isFixed: false },
    { label: "State", prop: "state", type: "Switch", width: "", isFixed: false },
    {
        label: "Operation",
        type: "Button",
        width: 330,
        isFixed: "right",
        btnList: [
            {
                type: "",
                label: "Add a related brand",
                handle: row => "addBrand"
            },
            {
                type: "",
                label: "Add Role",
                handle: row => "addRole"
            },
            {
                type: "",
                label: "Delete",
                handle: row => "delete"
            }
        ]
    }
]