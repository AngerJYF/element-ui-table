export const tableCols = [
    { label: "Role", prop: "Role", width: "", isFixed: false },
    { label: "Description", prop: "Description", width: "", isFixed: false },
    { label: "Create time", prop: "createTime", width: 200, isFixed: false },
    { label: "State", prop: "state", type: "Switch", width: "", isFixed: false },
    {
        label: "Operation",
        type: "Button",
        width: 150,
        isFixed: "right",
        btnList: [
            {
                type: "",
                label: "Edit",
                handle: row => "edit"
            },
            {
                type: "",
                label: "Delete",
                handle: row => "delete"
            }
        ]
    }
]