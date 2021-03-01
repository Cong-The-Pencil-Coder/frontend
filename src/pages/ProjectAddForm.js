import React from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../components/controls/Controls";
import { useForm, Form } from '../components/useForm';

const projectStatuses = [
    { id: 'In Progress', title: 'In Progress' },
    { id: 'Tentative', title: 'Tentative' },
    { id: 'Completed', title: 'Completed' },
]
const initialFValues = {
    prj_name: '',
    prj_stat: '',
    prj_manager: '',
    prj_ctr_val: '',
}

const ProjectAddForm=({addProject, setOpenPopup}) => {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('prj_name' in fieldValues)
            temp.prj_name = fieldValues.prj_name ? "" : "This field is required."
        if ('prj_stat' in fieldValues)
            temp.prj_stat = fieldValues.prj_stat ? "" : "This field is required."
        if ('prj_manager' in fieldValues)
            temp.prj_manager = fieldValues.prj_manager ? "" : "This field is required."
        if ('prj_ctr_val' in fieldValues)
            temp.prj_ctr_val = fieldValues.prj_ctr_val > 0 ? "" : "Positive number is required"
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addProject(values);

        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid>
                    <Controls.Input
                        name="prj_name"
                        label="Project Name"
                        value={values.prj_name}
                        onChange={handleInputChange}
                        error={errors.prj_name}
                    />
                    <Controls.Select
                        name="prj_stat"
                        label="Status"
                        value={values.prj_stat}
                        onChange={handleInputChange}
                        error={errors.prj_stat}
                        options={projectStatuses}
                    />
                    <Controls.Input
                        name="prj_manager"
                        label="Project Manager"
                        value={values.prj_manager}
                        onChange={handleInputChange}
                        error={errors.prj_manager}
                    />
                    <Controls.Input
                        name="prj_ctr_val"
                        label="Total Contract Value"
                        value={values.prj_ctr_val}
                        onChange={handleInputChange}
                        error={errors.prj_ctr_val}
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit"
                            onClick={() => setOpenPopup(false)}
                            />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}

export default ProjectAddForm;