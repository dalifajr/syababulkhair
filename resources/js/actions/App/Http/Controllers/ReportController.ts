import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ReportController::students
 * @see app/Http/Controllers/ReportController.php:20
 * @route '/reports/students'
 */
export const students = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: students.url(options),
    method: 'get',
})

students.definition = {
    methods: ["get","head"],
    url: '/reports/students',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::students
 * @see app/Http/Controllers/ReportController.php:20
 * @route '/reports/students'
 */
students.url = (options?: RouteQueryOptions) => {
    return students.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::students
 * @see app/Http/Controllers/ReportController.php:20
 * @route '/reports/students'
 */
students.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: students.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReportController::students
 * @see app/Http/Controllers/ReportController.php:20
 * @route '/reports/students'
 */
students.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: students.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReportController::students
 * @see app/Http/Controllers/ReportController.php:20
 * @route '/reports/students'
 */
    const studentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: students.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReportController::students
 * @see app/Http/Controllers/ReportController.php:20
 * @route '/reports/students'
 */
        studentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: students.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReportController::students
 * @see app/Http/Controllers/ReportController.php:20
 * @route '/reports/students'
 */
        studentsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: students.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    students.form = studentsForm
/**
* @see \App\Http\Controllers\ReportController::exportStudents
 * @see app/Http/Controllers/ReportController.php:131
 * @route '/reports/students/export'
 */
export const exportStudents = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportStudents.url(options),
    method: 'get',
})

exportStudents.definition = {
    methods: ["get","head"],
    url: '/reports/students/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::exportStudents
 * @see app/Http/Controllers/ReportController.php:131
 * @route '/reports/students/export'
 */
exportStudents.url = (options?: RouteQueryOptions) => {
    return exportStudents.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::exportStudents
 * @see app/Http/Controllers/ReportController.php:131
 * @route '/reports/students/export'
 */
exportStudents.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportStudents.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReportController::exportStudents
 * @see app/Http/Controllers/ReportController.php:131
 * @route '/reports/students/export'
 */
exportStudents.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportStudents.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReportController::exportStudents
 * @see app/Http/Controllers/ReportController.php:131
 * @route '/reports/students/export'
 */
    const exportStudentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportStudents.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReportController::exportStudents
 * @see app/Http/Controllers/ReportController.php:131
 * @route '/reports/students/export'
 */
        exportStudentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportStudents.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReportController::exportStudents
 * @see app/Http/Controllers/ReportController.php:131
 * @route '/reports/students/export'
 */
        exportStudentsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportStudents.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportStudents.form = exportStudentsForm
/**
* @see \App\Http\Controllers\ReportController::studentDetail
 * @see app/Http/Controllers/ReportController.php:167
 * @route '/reports/students/{student}'
 */
export const studentDetail = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: studentDetail.url(args, options),
    method: 'get',
})

studentDetail.definition = {
    methods: ["get","head"],
    url: '/reports/students/{student}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::studentDetail
 * @see app/Http/Controllers/ReportController.php:167
 * @route '/reports/students/{student}'
 */
studentDetail.url = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { student: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    student: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        student: typeof args.student === 'object'
                ? args.student.id
                : args.student,
                }

    return studentDetail.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::studentDetail
 * @see app/Http/Controllers/ReportController.php:167
 * @route '/reports/students/{student}'
 */
studentDetail.get = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: studentDetail.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReportController::studentDetail
 * @see app/Http/Controllers/ReportController.php:167
 * @route '/reports/students/{student}'
 */
studentDetail.head = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: studentDetail.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReportController::studentDetail
 * @see app/Http/Controllers/ReportController.php:167
 * @route '/reports/students/{student}'
 */
    const studentDetailForm = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: studentDetail.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReportController::studentDetail
 * @see app/Http/Controllers/ReportController.php:167
 * @route '/reports/students/{student}'
 */
        studentDetailForm.get = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: studentDetail.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReportController::studentDetail
 * @see app/Http/Controllers/ReportController.php:167
 * @route '/reports/students/{student}'
 */
        studentDetailForm.head = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: studentDetail.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    studentDetail.form = studentDetailForm
/**
* @see \App\Http\Controllers\ReportController::scores
 * @see app/Http/Controllers/ReportController.php:230
 * @route '/reports/scores'
 */
export const scores = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: scores.url(options),
    method: 'get',
})

scores.definition = {
    methods: ["get","head"],
    url: '/reports/scores',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::scores
 * @see app/Http/Controllers/ReportController.php:230
 * @route '/reports/scores'
 */
scores.url = (options?: RouteQueryOptions) => {
    return scores.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::scores
 * @see app/Http/Controllers/ReportController.php:230
 * @route '/reports/scores'
 */
scores.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: scores.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReportController::scores
 * @see app/Http/Controllers/ReportController.php:230
 * @route '/reports/scores'
 */
scores.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: scores.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReportController::scores
 * @see app/Http/Controllers/ReportController.php:230
 * @route '/reports/scores'
 */
    const scoresForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: scores.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReportController::scores
 * @see app/Http/Controllers/ReportController.php:230
 * @route '/reports/scores'
 */
        scoresForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: scores.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReportController::scores
 * @see app/Http/Controllers/ReportController.php:230
 * @route '/reports/scores'
 */
        scoresForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: scores.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    scores.form = scoresForm
/**
* @see \App\Http\Controllers\ReportController::exportScores
 * @see app/Http/Controllers/ReportController.php:348
 * @route '/reports/scores/export'
 */
export const exportScores = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportScores.url(options),
    method: 'get',
})

exportScores.definition = {
    methods: ["get","head"],
    url: '/reports/scores/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::exportScores
 * @see app/Http/Controllers/ReportController.php:348
 * @route '/reports/scores/export'
 */
exportScores.url = (options?: RouteQueryOptions) => {
    return exportScores.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::exportScores
 * @see app/Http/Controllers/ReportController.php:348
 * @route '/reports/scores/export'
 */
exportScores.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportScores.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ReportController::exportScores
 * @see app/Http/Controllers/ReportController.php:348
 * @route '/reports/scores/export'
 */
exportScores.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportScores.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ReportController::exportScores
 * @see app/Http/Controllers/ReportController.php:348
 * @route '/reports/scores/export'
 */
    const exportScoresForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportScores.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ReportController::exportScores
 * @see app/Http/Controllers/ReportController.php:348
 * @route '/reports/scores/export'
 */
        exportScoresForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportScores.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ReportController::exportScores
 * @see app/Http/Controllers/ReportController.php:348
 * @route '/reports/scores/export'
 */
        exportScoresForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportScores.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportScores.form = exportScoresForm
const ReportController = { students, exportStudents, studentDetail, scores, exportScores }

export default ReportController