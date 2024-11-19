import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    
    contain: {
        flex: 1,
        backgroundColor: '#66bed9',
    },
    title: {
        height: 80,
    },
    text: {
        marginBottom: 10,
        fontSize: 15,
    },
    input: {
        width: '90%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    scrollView: {
        flexGrow: 1,
        padding: 16,
    },
    buttonBox: {
        flex: 2,
        alignItems: 'center',
    },
    createButton: {
        backgroundColor: '#4CAF50',
        width: 200,
        height: 50,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        textAlign: 'center',
        lineHeight: 50,
        color: '#fff'
    }
});

export default styles;
