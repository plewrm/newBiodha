import React, { useState } from 'react'
import { Box, styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { Span } from 'app/components/Typography'
import { Card, Grid, Button } from '@mui/material'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))

const ContentBox = styled(Box)(() => ({
    height: '100%',
    padding: '32px',
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.01)',
}))

const IMG = styled('img')(() => ({
    width: '100%',
}))

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const ChangePassword = () => {
	const ChangePasswordRoot = styled(JustifyBox)(() => ({
	    background: '#1A2038',
	    minHeight: '100vh !important',
	    '& .card': {
	        maxWidth: 800,
	        borderRadius: 12,
	        margin: '1rem',
	    },
	}))

	const navigate = useNavigate()
    const [state, setState] = useState({})
    


    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
    }

    const handleFormSubmit = (event) => {
        console.log(state)
    }

    let { password,
        newPassword} = state
	return (
        <ChangePasswordRoot>
            <Card className="card">
                <Grid container>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <JustifyBox p={4} height="100%">
                            <IMG
                                src="/assets/images/illustrations/dreamer.svg"
                                alt=""
                            />
                        </JustifyBox>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <ContentBox>
                            <ValidatorForm onSubmit={handleFormSubmit}>
                                <TextField
                                    className="required"
		                            label="Old Password"
		                            onChange={handleChange}
		                            name="password"
		                            type="password"
		                            value={password || ''}
		                            validators={['required','matchRegexp:^.{5,255}$']}
		                            errorMessages={['this field is required','Minimum 5 characters required']}
		                        />
		                        <TextField
                                    className="required"
		                            label="New Password"
		                            onChange={handleChange}
		                            name="newPassword"
		                            type="password"
		                            value={newPassword || ''}
		                            validators={['required','matchRegexp:^.{5,255}$']}
		                            errorMessages={['this field is required','Minimum 5 characters required']}
		                        />
                                <FlexBox>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                    <Span sx={{ mr: 1, ml: '16px' }}>or</Span>
                                    <Button
                                        sx={{ textTransform: 'capitalize' }}
                                        onClick={() => navigate("/session/signin")}
                                    >
                                        Sign in
                                    </Button>
                                </FlexBox>
                            </ValidatorForm>
                        </ContentBox>
                    </Grid>
                </Grid>
            </Card>
        </ChangePasswordRoot>
    )
}
export default ChangePassword