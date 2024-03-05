'use client'

import styled from "styled-components";

const Container = styled.div`
background-image: url("/background/home.png");
background-size: cover;
background-position: center;
background-repeat: no-repeat;
height: 100vh;
width: 100%;
`

export default function BackgroundImage ({children}) {
    return (
        <Container>
            {children}
        </Container>
    )
}

