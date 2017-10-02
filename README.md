## React ⚛ + Styled Component 💅 Demo

A simple shopping cart application build with React ⚛ + MobX ♏ + Styled Component 💅 .

### Instructions

The easiest way to run this project is to start it locally using Docker.

Install and start Docker via command line.

```
$ docker-machine start
$ eval $(docker-machine env)
```

Take note of the IP address which docker machine runs in (you'll need it later).

```
$ docker-machine ip
```

Checkout this project and start the Docker containers.

```
$ cd [project-name]
$ docker-compose build
$ docker-compose up -d
```

The project will run the following containers:

 - `frontend`: Runs a webpack dev server with hot-reload enabled

This will setup a development environment for the project locally. To view the project in the browser, you'll need the Docker IP and access it at port `3000`, example `http://[docker-machine-ip]:3000/`.

To stop the project, use

```
$ docker-compose down
```

### Challenge

The challenge expects a simple shopping cart application base on a set of UI wireframes and mock data to be build using React. It also state that layouts should be preferably done using Flexbox and minimum 3rd party JS/CSS frameworks should be used.

### Motivation

This project is built using React with [MobX](https://github.com/mobxjs/mobx) to provide the backing store (state management). To take it one step further, I'm using [Styled Components](https://github.com/styled-components/styled-components) to:

- Allow us to write CSS in a consistent and natural way
- Play nice with existing CSS frameworks
- Reusable & component based UI (like React)
- Maintain sanity in styling management in a large application

### Problem

CSS preprocessing engines like Sass transform CSS into a decent programming language with use of variables, mixins and extends. However, without best practises in place and discipline in execution, we often end up with exploding stylesheets that often goes out of control in a large project.

This problem is even more pronounce when multiple developers contribute to the code base overtime, where individuals are concern with concrete UI implementation rather that the CSS framework maintainability.

While CSS Modules attempt to bring some sanity to building component based UI, it only provides a way to localise style definitions but does not address the issue of maintainability.

### Implementation

CSS in a fairly large application can be categorised into the following:

 1. Grid system that defines the layout structure (rarely changes)
 2. Theme related styles that is used globally, e.g button or form input styles (rarely changes)
 3. Component styles that are specific to reusable components, e.g. Product Item display
 4. Concrete layout implementation styles, e.g how a particular `div` is position on a page

This project uses [Bootstrap](https://github.com/twbs/bootstrap) to provide a default responsive grid (1) and theme (2), as it is not the focus of this exercise.

It will leverage [Styled Components](https://github.com/styled-components/styled-components) to manage Component related styles (3) and layout implementations (4). (It intentionally avoids using Bootstraps `col-*` grid system but uses CSS `flexbox` to implement most of the layouts.)

Styled Components are CSS that compiles to a High Order Component (HOC, wrapping component) in React. It allows us to write CSS classes in React components, must like how React lets use write HTML tags in JSX.

```
import React from "react"
import styled from "styled-components"

const Container = styled.div`
  background-color: ${props => props.color || 'green'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`

const MyContainer = () {
  return <Container color="blue">
    <p>Styled Component Rocks!</p>
  </Container>
};

// Compiles to
<div class="dxLjPX">
  <p>Styled Component Rocks!</p>
</div>
```

Styled Components provides several advantages:

- Ability to pass custom props or modifiers to the Styled Components (think `variables` in Sass)
- Create multiple CSS class variants through scripting in JS (think `mixins` in Sass)
- Extendable through subclassing (think `extend` in Sass)
- Write in CSS, not inline styles `style={{...}}` in React components
- Component based thinking, we don't worry about class name collision
- **Style definitions co-located with the UI component (not in a separate file). This is a huge win where we avoid the need to do remove component specific CSS from our style framework when it becomes obsolete**

This allows us to develop faster and leverage the full power of JS to process CSS styles, while making sure they remain consistent, reusable and easy to maintain.

--------

Please use issues for suggestions and bug reports.
