import React from 'react';
import PropTypes from 'prop-types';

export const JSONLD = props => {
  let json = null;
  if (props.children) {
    const ChildClass = props.children.type;
    const { children, type, ...schema } = props.children.props;
    const firstChild = new ChildClass(props.children.props).getJSON(true, schema);
    json = ChildClass.name === 'JSONLDNodeCollection'
      ? Object.assign({'@context': 'https://schema.org/'}, {[type]: firstChild})
      : Object.assign({'@context': 'https://schema.org/'}, firstChild)
  }

  return props.dangerouslyExposeHtml ? (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(json).replace(/</g, "\\u003C"),
      }}
    />
  ) : (
    <script type="application/ld+json">
      {JSON.stringify(json).replace(/</g, "\\u003C")}
    </script>
  );
}

JSONLD.propTypes = {
  additionalType: PropTypes.object,
  dangerouslyExposeHtml: PropTypes.bool
};

JSONLD.defaultProps = {
  dangerouslyExposeHtml: false
};

export default JSONLD;
