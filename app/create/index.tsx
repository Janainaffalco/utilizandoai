import { View, Text, StyleSheet, Pressable, ScrollView} from 'react-native'


import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { colors } from '../../app-example/constants/colors'
import { Header } from '../../app-example/components/header'
import { Select} from '../../app-example/components/input/select'
import { useDataStore } from '../../store/data'
import { router } from 'expo-router'


const schema = z.object({
    gender: z.string().min(1, { message: "O sexo é obrigatório"}),
    objective: z.string().min(1, { message: "O objetivo é obrigatório"}),
    level: z.string().min(1, { message: "Selecione seu nivel"}),
    
})

type FormData = z.infer<typeof schema>


export default function Create() {

      const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
            resolver: zodResolver(schema)
        })

      const setPagetwo = useDataStore(state => state.setPageTwo) 

        const genderOptions = [
            {label: "Masculino", value: "masculino"},
            {label: "Feminino", value: "feminino"},
        ]
        
        const levelOptions = [
            {label: "Sedentário (pouco ou nenhuma atividade física", value: "sedentario"},
            {label: "Levemente ativo (exercícios 1 a 3 vezes na semana", value: "Levemente ativo (exercícios 1 a 3 vezes por semana"},  
            {label: "Moderadamente ativo ( exercícios 3 a 5 vezes na semana", value: "Moderadamente ativo (exercícios 3 a 5 vezes por semana"},
            {label: "Muito ativo (exercícios 5 a 7 dias por semana", value: "Altamente ativo (exercícios 5 a 7 dias por semana"},
        ]

        const objectiveOptions = [
            {label: "Emagrecer", value: "emagrecer"},
            {label: "Hipertrofia", value: "Hipertrofia"},
            {label: "Hipertrofia + Definição", value: "hipertrofia + definição"},
            {label: "Definição", value: "definição"},
        ]

        function handleCreate(data: FormData){
            setPagetwo({
                level: data.level,
                gender: data.gender,
                objective: data.objective
            })

            router.push("/nutrition")
        }

   return (
        <View style={styles.container}>
            <Header
             step='Passo 2'
             title='Finalizando dieta'
            />

            <ScrollView style={styles.content}>
                <Text style={styles.label}>Sexo:</Text>
                <Select
                    control={control}
                    name="gender"
                    placeholder="Selecione seu sexo..."
                    error={errors.gender?.message}
                    options={genderOptions}

                />
                <Text style={styles.label}>Selecione o nível de atividade física:</Text>
                <Select
                    control={control}
                    name="level"
                    placeholder="Selecione seu nível de atividade física"
                    error={errors.level?.message}
                    options={levelOptions}

                />
                <Text style={styles.label}>Selecione o seu objetivo:</Text>
                <Select
                    control={control}
                    name="objective"
                    placeholder="Selecione seu objetivo"
                    error={errors.objective?.message}
                    options={objectiveOptions}

                />

                      <Pressable 
                        style={styles.button} 
                        onPress={handleSubmit(handleCreate)}
                      >
                                    <Text style={styles.buttonText}>Avançar</Text>
                      </Pressable>
                </ScrollView>
        </View>
   );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.background
    },
    label:{
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    content: {
        paddingLeft:16,
        paddingRight:16,
    },
    button:{
        backgroundColor: colors.blue,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    buttonText:{
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    }
})