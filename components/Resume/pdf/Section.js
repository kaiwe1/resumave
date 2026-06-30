import { StyleSheet, Text, View } from '@react-pdf/renderer';

const Section = ({ title, style, children }) => {
    const styles = StyleSheet.create({
        section_title: {
            textTransform: 'uppercase',
            color: '#333',
            fontSize: 13,
        },

        section_title_underline: {
            height: 1,
            margin: '2px 0px 6px 0px',
            backgroundColor: '#888',
        },
    });

    return (
        <View>
            {title && (
                <>
                    <Text style={styles.section_title}>{title}</Text>
                    <View style={styles.section_title_underline}></View>
                </>
            )}

            {children}
        </View>
    );
};

export default Section;
