import {useState} from 'react';
import { Card, CardHeader, CardBody, Heading, Text, Button, HStack,Box, Flex, Tag, TagLabel, TagRightIcon, TagLeftIcon, IconButton} from "@chakra-ui/react";
import { StarIcon, CloseIcon } from '@chakra-ui/icons';
import Link from "next/link";

type props = {
    name : string,
    description : string, 
    url : string, 
    stars : number, 
    callBack:()=>{},
    showDelete? : boolean
}

const CardComponent = (props : props) : JSX.Element=>{
    const [isFavorited, disableFav] = useState(false);
    const {name, description, url, stars, callBack, showDelete} = props;
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
                        <TagLeftIcon as={StarIcon} />
                        <TagLabel>{stars || 0}</TagLabel>
                    </Tag>
                    {!showDelete && (
                        <>
                        { !isFavorited ? <Button size="sm" onClick={()=>{callBack(); disableFav(true)}} >Favorite</Button> : 
                            <Tag size={'lg'} variant='outline' colorScheme='green'>
                                <TagLeftIcon as={StarIcon} />
                                <TagLabel>{'Saved!'}</TagLabel>
                            </Tag>
                        }
                        </>
                    )}
                    {showDelete && 
                        <IconButton
                        colorScheme='red'
                        aria-label='delete favorite'
                        onClick={()=>{callBack()}}
                        size='sm'
                        icon={<CloseIcon />}
                        />}
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