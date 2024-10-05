import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('The API description')
        .setVersion(process.env.npm_package_version)
        .setExternalDoc('/api-json', '/api-json')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    // カスタムレスポンスを全てのエンドポイントに追加
    document.paths = Object.entries(document.paths).reduce(
        (acc, [path, methods]) => {
            const newMethods = Object.entries(methods).reduce(
                (methodAcc, [method, details]) => {
                    if (!details.responses['400']) {
                        details.responses['400'] = {
                            description: 'Bad Request',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/DefaultErrorResponse',
                                    },
                                },
                            },
                        };
                    }
                    return { ...methodAcc, [method]: details };
                },
                {},
            );

            return { ...acc, [path]: newMethods };
        },
        {},
    );
    document.components.schemas = {
        ...document.components.schemas,
        DefaultErrorResponse: {
            type: 'object',
            required: ['code', 'message'],
            properties: {
                code: {
                    type: 'number',
                    example: 400,
                },
                message: {
                    type: 'string',
                    example: 'Bad Request',
                },
                error: {
                    type: 'string',
                    nullable: true,
                    example: 'Invalid input data',
                },
            },
        },
    };

    SwaggerModule.setup('api', app, document, {
        swaggerOptions: {
            preauthorizeBasicAuth: true, // 認証などを設定できる
        },
    });
    SwaggerModule.setup('swagger', app, document, {
        jsonDocumentUrl: 'swagger/json',
    });
}
