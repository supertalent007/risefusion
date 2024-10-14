import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Button, Stack, Typography, TextField } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios';

const MERCHANT_ID = "5ee483ed-3f5f-400b-8d74-b2648a359ef3";
const API_KEY = "0t3pZ6j4T3XSw19Xp89sNwa853w4GH";

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

const currencyMap = {
    840: { code: "USD", name: "US Dollar", country: "United States" },
    978: { code: "EUR", name: "Euro", country: "European Union" },
    946: { code: "RON", name: "Romanian Leu", country: "Romania" },
};

export default function MultipleSelectPlaceholder() {
    const [lang, setLang] = React.useState('EN');
    const [order, setOrder] = React.useState({});
    const [orderId, setOrderId] = React.useState('');
    const [usdAmount, setUsdAmount] = React.useState(null);
    const [cardInfo, setCardInfo] = React.useState({});

    const credentials = `${MERCHANT_ID}:${API_KEY}`;
    const encodedCredentials = btoa(credentials);

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const refParam = params.get('ref');
        if (refParam) {
            setOrderId(refParam);
        }
    }, []);

    React.useEffect(() => {
        if (orderId) {
            axios.get(`http://localhost:8080/https://www.vivapayments.com/web2/checkout/v2/paymentdetails?ref=${orderId}`, {
                headers: {
                    'Authorization': `Basic ${encodedCredentials}`,
                    'Content-Type': 'application/json',
                }
            })
                .then(res => {
                    setOrder(res.data);
                })
                .catch(err => console.error(err));
        }
    }, [orderId]);

    React.useEffect(() => {
        if (order) {
            const currentCurrency = currencyMap[order?.order?.currencyCode]?.code;
            fetch(`https://v6.exchangerate-api.com/v6/92bd4e1f1781ce3d4a8bb6fd/latest/${currentCurrency}`)
                .then(response => response.json())
                .then(data => {
                    const exchangeRate = data.conversion_rates["USD"];
                    setUsdAmount(exchangeRate * order?.order?.amount);
                })
                .catch(error => console.error('Error fetching the exchange rate:', error));
        }
    }, [order]);

    const handlePayment = async () => {
        try {
            const paymentData = {
                amount: order?.order?.amount,
                bankId: 'NET_VISA',
                cardholderBrandSelection: false,
                currencyCode: order?.order?.currencyCode,
                customer: {
                    email: order?.customer?.email,
                    fullName: order?.customer?.name
                },
                number: cardInfo.number,
                expirationMonth: cardInfo.expirationDate.split('/')[0],
                expirationYear: cardInfo.expirationDate.split('/')[1],
                cvc: cardInfo.cvc,
                holderName: cardInfo.holderName,
                orderCode: order?.order?.orderCode,
                installments: 0,
                rememberCard: false,
                selectedBrand: {
                    bankId: "NET_VISA",
                    brandId: 0,
                    default: true,
                    name: "visa",
                    requiresCvv: true,
                    supportsInstallments: false
                }
            };

            await axios.post(`http://localhost:8080/https://www.vivapayments.com/web2/checkout/v2/chargetokens`, paymentData, {
                headers: {
                    'Authorization': `Basic ${encodedCredentials}`,
                    'Content-Type': 'application/json'
                }
            }).then(async res => {
                const transactionData = {
                    amount: order.order.amount,
                    chargeToken: res.data.chargeToken,
                    currencyCode: order.order.currencyCode,
                    customer: {
                        email: cardInfo.email,
                        fullName: cardInfo.holderName,
                        notes: ''
                    },
                    installments: 0,
                    loyaltyInfo: {},
                    orderCode: order.order.orderCode,
                    tipAmount: 0
                }

                await axios
                    .post('http://localhost:8080/https://www.vivapayments.com/web2/checkout/v2/transactions', transactionData, {
                        headers: {
                            'Authorization': `Basic ${encodedCredentials}`,
                            'Content-Type': 'application/json'
                        }
                    })

                alert('Payment successful!');
            });

        } catch (error) {
            console.error('Error during payment:', error.response ? error.response.data : error.message);
            alert('Payment failed. Please try again.');
        }
    }

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

                        <Typography sx={{ color: '#fff', fontSize: '24px', mt: 1, mb: 4 }}>
                            Rise Fusion
                        </Typography>
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
                            <Typography>USD {usdAmount?.toFixed(2)}</Typography>
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
                    {/* <Button variant="contained" startIcon={<GoogleIcon />} sx={{ background: '#000', borderRadius: '11px', padding: '10px' }}>
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
                    </div> */}

                    <Stack spacing={2}>
                        <TextField
                            id="outlined-basic-email"
                            label="Email Address"
                            variant="outlined"
                            size="small"
                            type='email'
                            sx={{
                                backgroundColor: '#eceff1',
                                color: '#000',
                                borderRadius: '12px',
                            }}
                            onChange={e => setCardInfo({ ...cardInfo, email: e.target.value })}
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
                            onChange={e => setCardInfo({ ...cardInfo, number: e.target.value })}
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
                                onChange={e => setCardInfo({ ...cardInfo, expirationDate: e.target.value })}
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
                                onChange={e => setCardInfo({ ...cardInfo, cvc: e.target.value })}
                            />
                        </Stack>
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
                            onChange={e => setCardInfo({ ...cardInfo, holderName: e.target.value })}
                        />

                        <Button
                            variant="contained"
                            sx={{
                                background: 'hsla(187, 94%, 39%, 1)',
                                borderRadius: '11px',
                                padding: '10px'
                            }}
                            onClick={handlePayment}
                        >
                            Pay
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}
