import {
    StylesProvider,
    jssPreset,
    ThemeProvider,
    createMuiTheme
} from "@material-ui/core/styles";


import { create } from "jss";
import rtl from "jss-rtl";



const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const rtlTheme = createMuiTheme({ direction: "rtl" });
const ltrTheme = createMuiTheme({ direction: "ltr" });


export default function MuiDirection({ children, dir }) {
    return (
        <StylesProvider jss={jss}>
            <ThemeProvider theme={dir === 'rtl' ? rtlTheme : ltrTheme}>
                {children}
            </ThemeProvider>
        </StylesProvider>
    );
}
