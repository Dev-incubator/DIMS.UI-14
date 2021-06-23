import Divider from '../components/Homepage/About/Divider';
import classes from './About.module.css';
import Subtitle from '../components/Homepage/About/Subtitle';
import Feature from '../components/Homepage/About/Feature';
import RoleFeature from '../components/Homepage/About/RoleFeature';
import TechFeature from '../components/Homepage/About/TechFeature';
import Section from '../components/Homepage/About/Section';
import { features, roles, techs } from './about-helpers';

export default function About() {
  return (
    <main className={classes.main}>
      <h1 className={classes.title}>HyperCube Management System</h1>
      <Divider />
      <Section>
        {features.map((feature, index) => {
          if (index % 2 === 0) {
            return (
              <Feature img={feature.img} key={index.toString()} title={feature.title} descr={feature.descr} reversed />
            );
          }

          return <Feature img={feature.img} key={index.toString()} title={feature.title} descr={feature.descr} />;
        })}
      </Section>
      <Divider />
      <Section>
        <Subtitle>Roles Distribution</Subtitle>
        <div className={classes.roles__wrapper}>
          {roles.map((item, index) => (
            <RoleFeature img={item.img} title={item.title} list={item.list} key={index.toString()} />
          ))}
        </div>
      </Section>
      <Divider />
      <Section>
        <Subtitle>App Technologies</Subtitle>
        <div className={classes.tech__wrapper}>
          {techs.map((item, index) => (
            <TechFeature img={item.img} title={item.title} descr={item.descr} key={index.toString()} />
          ))}
        </div>
      </Section>
    </main>
  );
}
