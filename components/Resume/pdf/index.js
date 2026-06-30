'use client';

import { Page, Text, View, Document, Link, Font } from '@react-pdf/renderer';
import Section from './Section';
import ListItem from './ListItem';
import Icon from './Icon';
import styles from '../Styles';
import formatDate from '@/utils/formatDate';

Font.register({
    family: 'Noto Sans SC',
    fonts: [
        { src: '/fonts/NotoSansSC-Variable.ttf', fontWeight: 400, fontStyle: 'normal' },
        { src: '/fonts/NotoSansSC-Variable.ttf', fontWeight: 700, fontStyle: 'normal' },
        { src: '/fonts/NotoSansSC-Variable.ttf', fontWeight: 400, fontStyle: 'italic' },
    ],
});

const Header = ({ data }) => {
    const contactLinks = [
        { name: data['phone'], value: data['phone'], icon: 'phone' },
        { name: data['email'], value: `mailto:${data['email']}`, icon: 'email' },
        { name: 'LinkedIn', value: data['linkedin'], icon: 'linkedin' },
        { name: 'Github', value: data['github'], icon: 'github' },
        { name: 'Blogs', value: data['blogs'], icon: 'link' },
        { name: 'Twitter', value: data['twitter'], icon: 'twitter' },
        { name: 'Portfolio', value: data['portfolio'], icon: 'link' },
    ];

    return (
        <Section>
            <View style={styles.header}>
                <Text style={styles.header__name}>{data.name}</Text>
            </View>
            <View style={styles.header__links}>
                {contactLinks
                    .filter(obj => obj.value)
                    .map(({ value, name, icon }) => (
                        <View key={name} style={styles.header__link_item}>
                            {icon && <Icon name={icon} />}
                            <Link src={value} style={{ color: '#555' }}>
                                {name}
                            </Link>
                        </View>
                    ))}
            </View>
        </Section>
    );
};

const Education = ({ data, labels }) => (
    <Section title={labels.education}>
        {data.map(({ degree, institution, start, end, location, gpa }, i) => (
            <View key={i} style={styles?.wrappper}>
                <View style={styles.title_wrapper}>
                    <Text style={styles.title}>{degree}</Text>
                    <Text style={styles.date}>
                        {formatDate(start)}- {formatDate(end)}
                    </Text>
                </View>

                <View style={styles.subTitle_wrapper}>
                    <Text>
                        {institution}
                        {gpa && <Text> ({gpa})</Text>}
                    </Text>

                    <Text style={styles.date}>{location}</Text>
                </View>

                {i !== data.length - 1 && <View style={styles.line} />}
            </View>
        ))}
    </Section>
);

const Projects = ({ data, labels }) => (
    <Section title={labels.projects}>
        {data.map((project, i) => (
            <View key={i}>
                <View style={styles.title_wrapper}>
                    <Text style={styles.title}>{project.title}</Text>
                    {/* <Text style={styles.date}>
                        ({project.start} - {project.end})
                    </Text> */}
                </View>

                <View style={styles.subTitle_wrapper}>
                    <Link
                        style={{
                            textDecoration: 'none',
                            color: '#666',
                        }}
                        src={project.url}
                    >
                        {project.url}
                    </Link>
                </View>

                <View style={styles.lists}>
                    {project.description
                        ?.split('\n')
                        .filter(line => line)
                        .map((responsibility, i) => (
                            <ListItem key={i}>{responsibility}</ListItem>
                        ))}
                </View>

                {i !== data.length - 1 && <View style={styles.line} />}
            </View>
        ))}
    </Section>
);

const Experience = ({ data, labels }) => (
    <Section title={labels.experience}>
        {data.map(({ role, start, end, company, location, description }, i) => (
            <View key={i} style={styles?.wrappper}>
                <View style={styles.title_wrapper}>
                    <Text style={styles.title}>{role}</Text>
                    <Text style={styles.date}>
                        {formatDate(start)} - {formatDate(end)}
                    </Text>
                </View>

                <View style={styles.subTitle_wrapper}>
                    <Text>{company}</Text>
                    <Text>{location}</Text>
                </View>

                <View style={styles.lists}>
                    {description?.split('\n').map((responsibility, i) => (
                        <ListItem key={i}>{responsibility}</ListItem>
                    ))}
                </View>
                {i !== data.length - 1 && <View style={styles.line} />}
            </View>
        ))}
    </Section>
);

const Skills = ({ data, labels }) => (
    <Section title={labels.skills}>
        {data?.split('\n').map((line, i) => (
            <Text key={i} style={{ fontSize: 11 }}>
                {line}
            </Text>
        ))}
    </Section>
);

const Certificaes = ({ data, labels }) => (
    <Section title={labels.certifications}>
        {data.map(({ title, issuer, date }, i) => (
            <View key={i} style={styles?.wrappper}>
                <View style={styles.title_wrapper}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.date}>{formatDate(date)}</Text>
                </View>

                <View style={styles.subTitle_wrapper}>
                    <Text>{issuer}</Text>
                </View>

                {i !== data.length - 1 && <View style={styles.line} />}
            </View>
        ))}
    </Section>
);

const Languages = ({ data, labels }) => (
    <Section title={labels.languages}>
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
        >
            {data.map(({ language, proficiency }, i) => (
                <View key={i}>
                    <Text style={{ fontSize: 12 }}>{language}</Text>
                    <Text style={{ fontSize: 10, color: '#777' }}>{proficiency}</Text>
                </View>
            ))}
        </View>
    </Section>
);

const Resume = ({ data, labels }) => {
    const { contact, education, experience, projects, summary, skills, certificates, languages } = data;

    return (
        <Document language="en">
            <Page size="A4" style={styles.page}>
                <Header data={contact} />

                {summary?.summary && (
                    <Section title={labels.summary}>
                        <Text style={{ fontSize: 10 }}>{summary?.summary}</Text>
                    </Section>
                )}

                {education.length > 0 && <Education data={education} labels={labels} />}
                {experience.length > 0 && <Experience data={experience} labels={labels} />}
                {projects.length > 0 && <Projects data={projects} labels={labels} />}

                {skills?.skills?.length > 0 && <Skills data={skills.skills} labels={labels} />}
                {certificates?.length > 0 && <Certificaes data={certificates} labels={labels} />}
                {languages?.length > 0 && <Languages data={languages} labels={labels} />}
            </Page>
        </Document>
    );
};

export default Resume;
