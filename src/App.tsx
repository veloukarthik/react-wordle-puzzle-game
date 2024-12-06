import { useRef, useState } from 'react'
import { styled } from '@stitches/react'
import { useTrail, animated } from '@react-spring/web'

const AppContainer = styled('div', {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const Container = styled('div', {
  display: 'flex',
  gap: 10,
  marginBottom: 80,
})

const Box = styled('div', {
  position: 'relative',
  height: 50,
  width: 50,
})

const SharedStyles = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Helvetica',
  fontWeight: 800,
  backfaceVisibility: 'hidden',
}

const FrontBox = styled(animated.div, {
  ...SharedStyles,
  backgroundColor: '#fafafa',
  border: 'solid 2px #1a1a1a',
})

const BackBox = styled(animated.div, {
  ...SharedStyles,
  backgroundColor: '#6cab64',
  border: 'solid 2px #6cab64',
  color: '#fafafa',
})

export default function App() {
  const [items, setItems] = useState(['W', 'O', 'R', 'L', 'D'])
  const [index, setIndex] = useState(0)

  const [trail, api] = useTrail(items.length, () => ({
    rotateX: 0,
  }))

  const isFlipped = useRef(false)

  const handleClick = index => {
    if (isFlipped.current) {
      let inc = index + 1
      setIndex(inc)
      console.log('tested1')
      api.start({
        rotateX: 0,
      })
      isFlipped.current = false

      let newsets = ['India', 'China', 'USA', 'Russia', 'France', 'UnitedKingdom', 'Dubai']
      if (inc < newsets.length) {
        setItems(newsets[inc].split(''))
      } else {
        setItems(newsets[0].split(''))
        setIndex(0)
      }
    } else {
      console.log('tested2')
      api.start({
        rotateX: 180,
      })
      isFlipped.current = true
    }
  }

  return (
    <AppContainer>
      <Container onClick={() => handleClick(index)}>
        {trail.map(({ rotateX }, i) => (
          <Box key={i}>
            {i == 0 || i == items.length - 1 ? (
              <FrontBox
                key={items[i]}
                style={{
                  transform: rotateX.to(val => `perspective(600px) rotateX(${val}deg)`),
                  transformStyle: 'preserve-3d',
                  textTransform: 'uppercase',
                }}>
                {i == 0 ? items[0] : items[items.length - 1]}
              </FrontBox>
            ) : (
              <FrontBox
                key={items[i]}
                style={{
                  transform: rotateX.to(val => `perspective(600px) rotateX(${val}deg)`),
                  transformStyle: 'preserve-3d',
                }}>
                {'?'}
              </FrontBox>
            )}

            <BackBox
              style={{
                transform: rotateX.to(val => `perspective(600px) rotateX(${180 - val}deg)`),
                transformStyle: 'preserve-3d',
                textTransform: 'uppercase',
              }}>
              {items[i]}
            </BackBox>
          </Box>
        ))}
      </Container>
    </AppContainer>
  )
}
