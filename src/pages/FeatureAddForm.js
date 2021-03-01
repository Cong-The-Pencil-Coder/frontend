import React from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../components/controls/Controls";
import { useForm, Form } from '../components/useForm';

const featureStatuses = [
    { id: 'New', title: 'New' },
    { id: 'Open', title: 'Open' },
    { id: 'In Progress', title: 'In Progress' },
    { id: 'Closed', title: 'Closed' },
    { id: 'Completed', title: 'Completed' },
]

const featureGroups = [
    { id: 'G1 - User Interface', title: 'G1 - User Interface' },
    { id: 'G2 - Database', title: 'G2 - Database' },
    { id: 'G3 - Report Generation', title: 'G3 - Report Generation' },
    { id: 'G4 - Web Access', title: 'G4 - Web Access' },
]

const initialFValues = {
    ftr_name: '',
    ftr_stat: '',
    ftr_group: '',
    ftr_desc: '',
}

const FeatureAddForm=({addFeature, setOpenPopup}) => {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('ftr_name' in fieldValues)
            temp.ftr_name = fieldValues.ftr_name ? "" : "This field is required."
        if ('ftr_stat' in fieldValues)
            temp.ftr_stat = fieldValues.ftr_stat ? "" : "This field is required."
        if ('ftr_group' in fieldValues)
            temp.ftr_group = fieldValues.ftr_group ? "" : "This field is required."
        if ('ftr_desc' in fieldValues)
            temp.ftr_desc = fieldValues.ftr_desc ? "" : "This field is required."
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
            console.log(values)
            addFeature(values);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid>
                    <Controls.Input
                        name="ftr_name"
                        label="Feature Name"
                        value={values.ftr_name}
                        onChange={handleInputChange}
                        error={errors.ftr_name}
                    />
                    <Controls.Select
                        name="ftr_stat"
                        label="Status"
                        value={values.ftr_stat}
                        onChange={handleInputChange}
                        error={errors.ftr_stat}
                        options={featureStatuses}
                    />
                    <Controls.Select
                        name="ftr_group"
                        label="Group"
                        value={values.ftr_group}
                        onChange={handleInputChange}
                        error={errors.ftr_group}
                        options={featureGroups}
                    />
                    <Controls.Input
                        name="ftr_desc"
                        label="Feature Description"
                        value={values.ftr_desc}
                        onChange={handleInputChange}
                        error={errors.ftr_desc}
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

export default FeatureAddForm;