import type { AnchorHTMLAttributes } from 'react';
import {Link as RouterLink} from 'react-router-dom';

type ULinkProps = Pick<
	AnchorHTMLAttributes<HTMLAnchorElement>,
	'children' | 'className'
> & {
	href?: string;
	onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};


/**
 * ULink (Universal Link) - универсальная ссылка (обрабатывает внешний и внутренний роутинг)
 */
function ULink({children, href, ...props}: ULinkProps) {
	const isExternal = href?.startsWith('http');
	const isAnchor = href?.startsWith('#');

	if (href === undefined) {
		return (
			<a data-testid="link-undefined-id" {...props}>
				{children}
			</a>
		);
	}

	if (isExternal) {
		return (
			<a data-testid="link-external-id" href={href} rel="noreferrer noopener" target="_blank" {...props}>
				{children}
			</a>
		);
	}

	if (isAnchor) {
		return (
			<a data-testid="link-anchor-id" href={href} {...props}>
				{children}
			</a>
		);
	}

	return (
		<RouterLink data-testid="link-router-id" to={href} {...props}>
			{children}
		</RouterLink>
	);

}

export {ULink};
