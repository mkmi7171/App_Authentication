import React, { useEffect, useRef, useState } from 'react'
import { TextInput, View, Pressable, Text, StyleSheet } from 'react-native'

export default function Otp({ code, setCode, maximumLength, setIsPinReady }) {
    const inputRef = useRef()
    const [isInputBoxFocused, setIsInputBoxFocused] = useState(false)

    useEffect(() => {
        setIsPinReady(code.length === maximumLength)

        return () => {
            setIsPinReady(false)
        }
    }, [code])

    const handleOnPress = () => {
        setIsInputBoxFocused(true)
        inputRef.current.focus()
    }

    const handleOnBlur = () => {
        setIsInputBoxFocused(false)
    }

    const boxArray = new Array(maximumLength).fill(0)

    const boxDigit = (item, index) => {
        const emptyInput = ""
        const digit = code[index] || emptyInput

        const isCurrentValue = index === code.length
        const isLastValue = index === maximumLength - 1
        const isCodeCompeleted = code.length === maximumLength
        const isValueFocused = isCurrentValue || (isLastValue && isCodeCompeleted)


        return (
            <View key={index} style={[styles.digit, isInputBoxFocused && isValueFocused ? styles.digitOn : styles.digitOff]}>
                <Text style={{ fontSize: 22 }}>{digit}</Text>
            </View>
        )
    }

    return (
        <View>
            <Pressable onPress={handleOnPress} style={styles.boxOfDigit}>{boxArray.map(boxDigit)}</Pressable>
            <TextInput style={styles.input}
                value={code}
                onChangeText={setCode}
                maxLength={maximumLength}
                ref={inputRef}
                onBlur={handleOnBlur}
                keyboardType='number-pad'
                placeholder=' کد را وارد نمایید'
            />

        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        opacity: 0
    },
    boxOfDigit: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 25
    },
    digit: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        minWidth: 50,
        minHeight: 50,
        borderRadius: 5,
        margin: 5
    },
    digitOff: {
        borderColor: 'lightgray',
        backgroundColor: 'white'
    },
    digitOn: {
        backgroundColor: 'gray',
        borderColor: 'white',
        borderColor: 'white'
    }

})