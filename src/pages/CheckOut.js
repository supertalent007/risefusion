import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Button, Stack, Typography, TextField } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';


const languageModels = [
    {
        language: 'English',
        code: 'EN'
    },
    {
        language: 'Deutsch',
        code: 'DE'
    },
    {
        language: 'Français',
        code: 'FR'
    },
    {
        language: 'Italiano',
        code: 'IT'
    },
    {
        language: 'Español',
        code: 'ES'
    },
    {
        language: 'Polski',
        code: 'PL'
    },
    {
        language: 'Română',
        code: 'RO'
    },
    {
        language: 'Dutch',
        code: 'NL'
    },
    {
        language: 'Ελληνικά',
        code: 'EL'
    },
    {
        language: 'Česky',
        code: 'CS'
    },
    {
        language: 'Português',
        code: 'PT'
    },
    {
        language: 'Magyar',
        code: 'HU'
    },
    {
        language: 'Български',
        code: 'BG'
    },
    {
        language: 'Dansk',
        code: 'DA'
    },
    {
        language: 'Suomi',
        code: 'FI'
    },
    {
        language: 'Hrvatski',
        code: 'HR'
    },
    {
        language: 'Svenska',
        code: 'SV'
    },
]

export default function MultipleSelectPlaceholder() {
    const theme = useTheme();
    const [lang, setLang] = React.useState('EN');


    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f0f0f0',
            }}
        >
            <Stack direction="row" sx={{ width: '1000px', borderRadius: '25px' }}>
                <Stack sx={{ width: '50%', minWidth: '50%' }}>
                    <Stack sx={{ background: 'hsla(187, 94%, 39%, 1)', alignItems: 'center', display: 'flex', borderTopLeftRadius: '25px !important' }}>
                        <FormControl sx={{ mr: '10px', ml: 'auto', mt: '10px' }}>
                            <Select
                                onChange={e => setLang(e.target.value)}
                                input={<OutlinedInput />}
                                value={lang}
                                inputProps={{ 'aria-label': 'Without label' }}
                                sx={{ height: '28px', borderRadius: '10px', fontSize: '.75rem', color: '#fff', border: 'none' }}
                                renderValue={(selected) => {
                                    const selectedModel = languageModels.find(model => model.code === selected);
                                    return selectedModel ? selectedModel.code : '';
                                }}
                            >
                                {languageModels.map((model) => (
                                    <MenuItem key={model.code} value={model.code}>
                                        {model.language}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #fff',
                            borderRadius: '50%',
                            width: '128px !important',
                            height: '128px !important',
                            minWidth: '128px !important',
                            background: '#fff'
                        }}>
                            {/* <img
                                src="https://www.vivapayments.com/api/persons/5ee483ed-3f5f-400b-8d74-b2648a359ef3/sourcelogo?code=Default"
                                style={{ maxWidth: '90%', width: 'unset', height: 'unset' }}
                            /> */}
                        </Box>

                        <Typography sx={{ color: '#fff', fontSize: '24px', mt: 1, mb: 4 }}>RiseFusion</Typography>
                    </Stack>

                    <Stack sx={{
                        padding: '32px',
                        background: 'rgb(4, 127, 143)',
                        borderBottomLeftRadius: '20px',
                        height: '100%'
                    }}>
                        <Stack sx={{
                            border: '2px solid hsla(0,0%,100%,.25)',
                            borderRadius: '11px',
                            padding: '12px',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            color: '#fff',
                        }}>
                            <Typography>customer</Typography>
                            <Typography>USD 50</Typography>
                        </Stack>

                    </Stack>
                </Stack>

                <Stack
                    sx={{
                        padding: '40px',
                        width: '50%',
                        background: '#fff',
                        borderTopRightRadius: '25px',
                        borderBottomRightRadius: '25px'
                    }}>
                    <Button variant="contained" startIcon={<GoogleIcon />} sx={{ background: '#000', borderRadius: '11px', padding: '10px' }}>
                        Pay
                    </Button>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '16px',
                        marginBottom: '30px'
                    }}>
                        <hr style={{ flexGrow: 1, borderColor: '#ccc' }} />
                        <Typography variant="body2" color="textSecondary" sx={{ margin: '0 8px' }}>
                            Or pay with
                        </Typography>
                        <hr style={{ flexGrow: 1, borderColor: '#ccc' }} />
                    </div>

                    <Stack spacing={2}>
                        <TextField
                            id="outlined-basic-email"
                            label="Email Address"
                            variant="outlined"
                            size="small"
                            sx={{
                                backgroundColor: '#eceff1',
                                color: '#000',
                                borderRadius: '12px',
                            }}
                        />
                        <TextField
                            id="outlined-basic-card-holder-name"
                            label="Cardholder Name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            sx={{
                                backgroundColor: '#eceff1',
                                color: '#000',
                                borderRadius: '12px',
                            }}
                        />
                        <TextField
                            id="outlined-basic-card-number"
                            label="Card Number"
                            variant="outlined"
                            size="small"
                            fullWidth
                            sx={{
                                backgroundColor: '#eceff1',
                                color: '#000',
                                borderRadius: '12px',
                            }}
                        // InputProps={{
                        //     endAdornment: (
                        //         <InputAdornment position="end">
                        //             <img src={VisaLogo} alt="Visa" style={{ height: 24, marginRight: 4 }} />
                        //             <img src={MasterCardLogo} alt="MasterCard" style={{ height: 24 }} />
                        //         </InputAdornment>
                        //     ),
                        // }}
                        />
                        <Stack direction="row" spacing={2}>
                            <TextField
                                id="outlined-basic-expiration"
                                label="Expiration Date"
                                variant="outlined"
                                size="small"
                                fullWidth
                                sx={{
                                    backgroundColor: '#eceff1',
                                    color: '#000',
                                    borderRadius: '12px',
                                }}
                            />
                            <TextField
                                id="outlined-basic-cvv"
                                label="CVV"
                                variant="outlined"
                                size="small"
                                fullWidth
                                sx={{
                                    backgroundColor: '#eceff1',
                                    color: '#000',
                                    borderRadius: '12px',
                                }}
                            />
                        </Stack>
                        <Button variant="contained" sx={{
                            background: 'hsla(187, 94%, 39%, 1)',
                            borderRadius: '11px',
                            padding: '10px'
                        }}>
                            Pay
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}
