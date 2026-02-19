import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ParentPortalController::show
 * @see app/Http/Controllers/ParentPortalController.php:259
 * @route '/parent/report-cards/{reportCard}'
 */
export const show = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/parent/report-cards/{reportCard}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ParentPortalController::show
 * @see app/Http/Controllers/ParentPortalController.php:259
 * @route '/parent/report-cards/{reportCard}'
 */
show.url = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reportCard: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reportCard: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reportCard: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reportCard: typeof args.reportCard === 'object'
                ? args.reportCard.id
                : args.reportCard,
                }

    return show.definition.url
            .replace('{reportCard}', parsedArgs.reportCard.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ParentPortalController::show
 * @see app/Http/Controllers/ParentPortalController.php:259
 * @route '/parent/report-cards/{reportCard}'
 */
show.get = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ParentPortalController::show
 * @see app/Http/Controllers/ParentPortalController.php:259
 * @route '/parent/report-cards/{reportCard}'
 */
show.head = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ParentPortalController::show
 * @see app/Http/Controllers/ParentPortalController.php:259
 * @route '/parent/report-cards/{reportCard}'
 */
    const showForm = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ParentPortalController::show
 * @see app/Http/Controllers/ParentPortalController.php:259
 * @route '/parent/report-cards/{reportCard}'
 */
        showForm.get = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ParentPortalController::show
 * @see app/Http/Controllers/ParentPortalController.php:259
 * @route '/parent/report-cards/{reportCard}'
 */
        showForm.head = (args: { reportCard: number | { id: number } } | [reportCard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const reportCards = {
    show: Object.assign(show, show),
}

export default reportCards