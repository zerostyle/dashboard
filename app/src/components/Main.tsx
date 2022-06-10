import { Grid, GridItem, Stack, StackProps } from '@chakra-ui/react'

const HEIGHT = 300

export const Main = (props: StackProps) => <Stack spacing="1.5rem" width="100%" maxWidth="48rem" {...props} />
  <Stack width="100%" maxWidth={1400} px={4} gap={10} {...props}>
    <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(12, 1fr)" gap={4}>
      <GridItem h={HEIGHT} colSpan={3} bg="tomato" />
      <GridItem h={HEIGHT} colSpan={9} bg="papayawhip" />
      <GridItem h={HEIGHT} colSpan={6} bg="papayawhip" />
      <GridItem h={HEIGHT} colSpan={6} bg="papayawhip" />
      <GridItem h={HEIGHT} colSpan={8} bg="papayawhip" />
      <GridItem h={HEIGHT} colSpan={4} bg="purple.900" />
      <GridItem h={HEIGHT} colSpan={12} bg="papayawhip" />
    </Grid>
  </Stack>
)
