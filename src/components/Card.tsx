import { Card, CardHeader, CardBody, Heading, Text, Button, HStack,Box, Flex, Tag, TagLabel, TagRightIcon} from "@chakra-ui/react";
import { StarIcon } from '@chakra-ui/icons';
import Link from "next/link";

type props = {
    name : string,
    description : string, 
    url : string, 
    stars : number, 
    callBack:()=>{}
}

const CardComponent = (props : props) : JSX.Element=>{
    const {name, description, url, stars, callBack} = props;
    return(
        <Card>
            <CardHeader>
            <Flex>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Box>
                    <Heading size='sm'><Link href={url}>{name}</Link></Heading>
                    </Box>
                </Flex>
                <HStack spacing={4}>
                    <Tag size={'lg'} variant='outline' colorScheme='blue'>
                        <TagLabel>{stars || 0}</TagLabel>
                        <TagRightIcon as={StarIcon} />
                    </Tag>
                    <Button onClick={()=>{callBack()}} >Favorite</Button>
                </HStack>
            </Flex>
            </CardHeader>
            <CardBody>
                <Text>
                    {description}
                </Text>
            </CardBody>
        </Card>
    )
}

export default CardComponent