import { Story } from '@storybook/react/types-6-0';
import React from 'react';
import { UITypography, UITypographyProps } from './ui-typography';

export default {
    title: 'UI components/Typography'
};

const Template: Story<UITypographyProps> = props => <UITypography {...props} />;

export const DefaultSingle = Template.bind({});
DefaultSingle.args = {
    variant: 'body1',
    children: 'Toto Africa'
};

export const Default = () => {

    return <>

        <UITypography variant="h1" gutterBottom>
            h1. Heading
      </UITypography>
        <UITypography variant="h2" gutterBottom>
            h2. Heading
      </UITypography>
        <UITypography variant="h3" gutterBottom>
            h3. Heading
      </UITypography>
        <UITypography variant="h4" gutterBottom>
            h4. Heading
      </UITypography>

        <UITypography variant="body1" gutterBottom>
            body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
            unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
            dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </UITypography>
        <UITypography variant="body2" gutterBottom>
            body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
            unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
            dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </UITypography>

        <UITypography variant="labelMini" gutterBottom>
            label mini
      </UITypography>

    </>;
};
