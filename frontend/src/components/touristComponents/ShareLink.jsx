import React from "react";
import { Alert, Avatar, Button, Dialog, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Snackbar, Typography } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import LinkIcon from '@mui/icons-material/Link';
import EmailIcon from '@mui/icons-material/Email';


function SimpleDialog(props) {
    const { copyLink, emailLink, onClose, open } = props;

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle sx={{
                textAlign: 'center',
            }}>Share with friends</DialogTitle>
            <List sx={{ pt: 0 }}>
                <ListItem disableGutters>
                    <ListItemButton
                        onClick={copyLink}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <LinkIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Copy link to clipboard" />
                    </ListItemButton>
                </ListItem>

                <ListItem disableGutters>
                    <ListItemButton
                        onClick={emailLink}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <EmailIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Send link via Email" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Dialog>
    );
}

const ShareLink = ({ id, type }) => {
    const [open, setOpen] = React.useState(false);
    const [copied, setCopied] = React.useState(false);

    const getLink = () => {
        let link = 'localhost:5173/tourist/'
        switch (type) {
            case "activity":
                link += 'activities?id='
                break;
            case "itinerary":
                link += 'itineraries?id='
                break;
            case "product":
                link += 'products?id='
                break;
            case "monument":
                link += 'monuments?id='
                break;
            default:
                break;
        }
        link += id
        return link;
    }


    const copyLinkToClipboard = async () => {
        const link = getLink();
        await navigator.clipboard.writeText(link);
        setOpen(false)
        setCopied(true);
    };

    const sendEmailLink = () => {
        const link = getLink();
        const subject = `Check out this ${type}!`;
        const body = `I thought you'd like it: \n ${link}`;
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setOpen(false);
    };

    const handleClick = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setCopied(false);
    }

    return (
        <div>
            <Snackbar open={copied} autoHideDuration={1500} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    sx={{
                        width: '100%',
                        backgroundColor: '#FFBF00',
                    }}
                >
                    Link Copied to Clipboard
                </Alert>
            </Snackbar>


            <IconButton onClick={handleClick} sx={{
                mt: '-10px',
                mr: '-10px',
                ml: '5px'
            }}>
                <ShareIcon />
            </IconButton>
            <SimpleDialog
                copyLink={copyLinkToClipboard}
                emailLink={sendEmailLink}
                open={open}
                onClose={handleClose}
            />


        </div>

    );
}

export default ShareLink;
