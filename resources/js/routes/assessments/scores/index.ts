import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\AssessmentController::save
 * @see app/Http/Controllers/AssessmentController.php:222
 * @route '/assessments/scores/{assessment}'
 */
export const save = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: save.url(args, options),
    method: 'post',
})

save.definition = {
    methods: ["post"],
    url: '/assessments/scores/{assessment}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AssessmentController::save
 * @see app/Http/Controllers/AssessmentController.php:222
 * @route '/assessments/scores/{assessment}'
 */
save.url = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assessment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { assessment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    assessment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assessment: typeof args.assessment === 'object'
                ? args.assessment.id
                : args.assessment,
                }

    return save.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssessmentController::save
 * @see app/Http/Controllers/AssessmentController.php:222
 * @route '/assessments/scores/{assessment}'
 */
save.post = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: save.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AssessmentController::save
 * @see app/Http/Controllers/AssessmentController.php:222
 * @route '/assessments/scores/{assessment}'
 */
    const saveForm = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: save.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AssessmentController::save
 * @see app/Http/Controllers/AssessmentController.php:222
 * @route '/assessments/scores/{assessment}'
 */
        saveForm.post = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: save.url(args, options),
            method: 'post',
        })
    
    save.form = saveForm
/**
* @see \App\Http\Controllers\AssessmentController::template
 * @see app/Http/Controllers/AssessmentController.php:253
 * @route '/assessments/scores/{assessment}/template'
 */
export const template = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template.url(args, options),
    method: 'get',
})

template.definition = {
    methods: ["get","head"],
    url: '/assessments/scores/{assessment}/template',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AssessmentController::template
 * @see app/Http/Controllers/AssessmentController.php:253
 * @route '/assessments/scores/{assessment}/template'
 */
template.url = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assessment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { assessment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    assessment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assessment: typeof args.assessment === 'object'
                ? args.assessment.id
                : args.assessment,
                }

    return template.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssessmentController::template
 * @see app/Http/Controllers/AssessmentController.php:253
 * @route '/assessments/scores/{assessment}/template'
 */
template.get = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AssessmentController::template
 * @see app/Http/Controllers/AssessmentController.php:253
 * @route '/assessments/scores/{assessment}/template'
 */
template.head = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: template.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AssessmentController::template
 * @see app/Http/Controllers/AssessmentController.php:253
 * @route '/assessments/scores/{assessment}/template'
 */
    const templateForm = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: template.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AssessmentController::template
 * @see app/Http/Controllers/AssessmentController.php:253
 * @route '/assessments/scores/{assessment}/template'
 */
        templateForm.get = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: template.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AssessmentController::template
 * @see app/Http/Controllers/AssessmentController.php:253
 * @route '/assessments/scores/{assessment}/template'
 */
        templateForm.head = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: template.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    template.form = templateForm
/**
* @see \App\Http\Controllers\AssessmentController::importMethod
 * @see app/Http/Controllers/AssessmentController.php:266
 * @route '/assessments/scores/{assessment}/import'
 */
export const importMethod = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(args, options),
    method: 'post',
})

importMethod.definition = {
    methods: ["post"],
    url: '/assessments/scores/{assessment}/import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AssessmentController::importMethod
 * @see app/Http/Controllers/AssessmentController.php:266
 * @route '/assessments/scores/{assessment}/import'
 */
importMethod.url = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assessment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { assessment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    assessment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assessment: typeof args.assessment === 'object'
                ? args.assessment.id
                : args.assessment,
                }

    return importMethod.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AssessmentController::importMethod
 * @see app/Http/Controllers/AssessmentController.php:266
 * @route '/assessments/scores/{assessment}/import'
 */
importMethod.post = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AssessmentController::importMethod
 * @see app/Http/Controllers/AssessmentController.php:266
 * @route '/assessments/scores/{assessment}/import'
 */
    const importMethodForm = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: importMethod.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AssessmentController::importMethod
 * @see app/Http/Controllers/AssessmentController.php:266
 * @route '/assessments/scores/{assessment}/import'
 */
        importMethodForm.post = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: importMethod.url(args, options),
            method: 'post',
        })
    
    importMethod.form = importMethodForm
const scores = {
    save: Object.assign(save, save),
template: Object.assign(template, template),
import: Object.assign(importMethod, importMethod),
}

export default scores