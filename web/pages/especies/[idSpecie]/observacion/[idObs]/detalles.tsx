import ObsDetail from "../../../../../components/ObservationDetail";
import Principal from "../../../../../components/Shell";
import { Container } from "@mantine/core";
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps= async(context)=>{
  const id:string = context.params?.idObs as string
  return{
    props:{
      idGet:id,
    }
  }
}

export default function Observacion(props:any) {

    return (<>
      <Principal>
        <Container mt="lg" size="xl">
          <ObsDetail id={props.idGet} />
        </Container>
      </Principal>
    </>)
}